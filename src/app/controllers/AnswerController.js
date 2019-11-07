import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Mail from '../lib/Mail';
import Student from '../models/Student';

class AnswerController {
    async store(req, res) {
        const { id } = req.params;

        const helpOrder = await HelpOrder.findByPk(id);

        if (!helpOrder) {
            return res.status(404).json({ error: 'Invalid help order id.' });
        }

        const schema = Yup.object().shape({
            answer: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed' });
        }

        const { answer } = req.body;

        helpOrder.answer = answer;
        helpOrder.answer_at = new Date();

        await helpOrder.save();

        const student = await Student.findByPk(helpOrder.student_id);

        Mail.sendMail({
            to: `${student.name} <${student.email}>`,
            subject: 'Your help order was answered!',
            template: 'helpAnswer',
            context: {
                name: student.name,
                question: helpOrder.question,
                answer,
            },
        });
        return res.status(201).json({ message: 'ok' });
    }
}

export default new AnswerController();
