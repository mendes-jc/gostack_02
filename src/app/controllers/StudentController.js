import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
    async index(req, res) {
        const students = await Student.findAll();

        return res.json(students);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.number()
                .positive()
                .required(),
            height: Yup.number()
                .positive()
                .required(),
            weight: Yup.number()
                .positive()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Check the provided data and try again.' });
        }

        const studentExists = await Student.findOne({
            where: { email: req.body.email },
        });

        if (studentExists) {
            return res.status(400).json({
                error:
                    'This e-mail is already registered. Try with another one.',
            });
        }

        const { id, name, email } = await Student.create(req.body);

        return res.status(201).json({
            message: 'The student was registered!',
            student: { id, name, email },
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.number()
                .positive()
                .required(),
            height: Yup.number()
                .positive()
                .required(),
            weight: Yup.number()
                .positive()
                .required(),
        });

        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({ error: 'You need to provide and student id' });
        }

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Check the provided data and try again.' });
        }

        const student = await Student.findByPk(id);

        if (!student) {
            return res
                .status(400)
                .json({ error: 'There is no student with this id.' });
        }

        const { email } = req.body;

        if (email !== student.email) {
            const studentExists = await Student.findOne({
                where: { email },
            });

            if (studentExists) {
                return res.status(400).json({
                    error:
                        'This e-mail is already registered. Try with another one.',
                });
            }
        }

        const updatedStudent = await student.update(req.body);

        return res.status(200).json({
            message: 'Student updated sucessfully!',
            student: updatedStudent,
        });
    }
}

export default new StudentController();
