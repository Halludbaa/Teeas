import { QuizHistory } from '@/model/quiz_model';

interface FinishMenuProps {
    quizH: QuizHistory;
}

export default function FinishMenu({ quizH }: FinishMenuProps) {
    console.info(quizH);

    return (
        <>
            <div>Congratulation!</div>
        </>
    );
}
