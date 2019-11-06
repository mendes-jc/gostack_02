import * as Yup from 'yup';
import { addMonths, parseISO, format } from 'date-fns';

import Plan from '../models/Plan';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

import Mail from '../lib/Mail';

class EnrollmentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            start_date: Yup.date().required(),
            plan_id: Yup.number()
                .integer()
                .required(),
            student_id: Yup.number()
                .integer()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed.' });
        }
        const { start_date, student_id, plan_id } = req.body;

        const plan = await Plan.findByPk(plan_id);

        if (!plan) {
            return res
                .status(404)
                .json({ error: 'This plan id does not exist.' });
        }

        const student = await Student.findByPk(student_id);

        if (!student) {
            return res
                .status(404)
                .json({ error: 'This student id does not exist.' });
        }

        const end_date = addMonths(parseISO(start_date), plan.duration);
        const price = plan.price * plan.duration;

        const enrollment = await Enrollment.create({
            start_date,
            end_date,
            price,
            student_id,
            plan_id,
        });

        await Mail.sendMail({
            to: `${student.name} <${student.email}>`,
            subject: 'You are now enrolled with GymPoint!',
            template: 'enrollmentCreation',
            context: {
                student: student.name,
                plan: plan.title,
                startDate: format(enrollment.start_date, 'dd/MM/yyyy'),
                endDate: format(enrollment.end_date, 'dd/MM/yyyy'),
            },
        });

        return res.json({
            message: 'Enrollment created successfully!',
            enrollment,
        });
    }
}

export default new EnrollmentController();
