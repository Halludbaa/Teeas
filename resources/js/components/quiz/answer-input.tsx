export type AnswerSelected = (e: React.FormEvent<HTMLInputElement>) => void;
interface AnswerProps {
    answer: string;
    value: string;
    onSelected: AnswerSelected;
}
export default function AnswerInput({ answer, value, onSelected }: AnswerProps) {
    return (
        <label
            htmlFor={value}
            className={`block cursor-pointer rounded-2xl border-2 border-black bg-transparent px-10 py-6 text-lg font-medium transition-transform duration-300 has-checked:-translate-y-1.5 has-checked:bg-black has-checked:text-white dark:border-white dark:text-white dark:has-checked:bg-white dark:has-checked:text-black`}
        >
            <span className="block h-full w-full overflow-auto text-center text-xl">{answer}</span>
            <input
                type="radio"
                id={value}
                name="answer"
                value={value}
                className="hidden"
                onClick={(e) => {
                    onSelected(e);
                }}
            />
        </label>
    );
}
