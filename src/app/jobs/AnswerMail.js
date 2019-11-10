import Mail from '../lib/Mail';

class AnswerMail {
    get key() {
        return 'AnswerMail';
    }

    async handle({ data }) {
        const { student, helpOrder, answer } = data;

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
    }
}

export default new AnswerMail();
