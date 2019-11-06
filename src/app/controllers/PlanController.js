import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            price: Yup.number()
                .positive()
                .required(),
            duration: Yup.number()
                .positive()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed.' });
        }

        const planExists = await Plan.findOne({
            where: {
                title: req.body.title,
                deleted: false,
            },
        });

        if (planExists) {
            return res.status(400).json({
                message: 'Please use another title.',
            });
        }

        const { id, title, duration, price } = await Plan.create(req.body);

        return res.status(201).json({
            message: 'Plan created sucessfully!',
            plan: {
                id,
                title,
                duration,
                price,
            },
        });
    }

    async index(req, res) {
        const plans = await Plan.findAll({
            where: { deleted: false },
            attributes: ['title', 'duration', 'price'],
        });

        return res.json(plans);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string(),
            price: Yup.number().positive(),
            duration: Yup.number().positive(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed.' });
        }

        const plan = await Plan.findByPk(req.params.id);

        if (!plan) {
            return res
                .status(404)
                .json({ error: 'This plan does not exists.' });
        }

        if (plan.deleted) {
            return res
                .status(401)
                .json({ error: 'You cant change a deleted plan.' });
        }
        if (req.body.title && req.body.title !== plan.title) {
            const planExists = await Plan.findOne({
                where: {
                    title: req.body.title,
                    deleted: false,
                },
            });

            if (planExists) {
                return res.status(400).json({
                    message: 'Please use another title.',
                });
            }
        }

        const { id, title, duration, price } = await plan.update(req.body);

        return res.status(200).json({
            message: 'Plan updated sucessfully!',
            plan: { id, title, duration, price },
        });
    }

    async delete(req, res) {
        const plan = await Plan.findByPk(req.params.id);

        if (!plan) {
            return res
                .status(404)
                .json({ error: 'This plan does not exists.' });
        }

        if (plan.deleted) {
            return res
                .status(400)
                .json({ error: 'This plan is already deleted.' });
        }

        plan.deleted = true;
        await plan.save();

        return res
            .status(200)
            .json({ message: 'Plan deleted sucessully', plan });
    }
}

export default new PlanController();
