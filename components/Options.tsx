import { useEffect, useState } from "react";

interface OptionProps {
    options: string[] | undefined;
    answer: number | undefined;
    scoreCallback: (score: number) => void; // handles score change
    selectedCallback: (selected: number) => void; // handles question change
}

const Options: React.FC<OptionProps> = (props) => {

    const [selected, setSelected] = useState<number | undefined>(undefined);

    const handleAnswer = (index: number) => {
        handleSelected(index);
        if (index === props.answer) {
            props.scoreCallback(1);
        } else {
            // if answer is wrong or time is up, score is 0
            props.scoreCallback(0);
        }
    }

    // handles the selected option, emits the selected option to parent
    const handleSelected = (index: number) => {
        setSelected(index);
        props.selectedCallback(index);
    }

    // resets the selected option when the question changes
    useEffect(() => {
        setSelected(undefined);
    }, [props.answer]);

    return (
        <div className="flex flex-col items-center justify-between w-full">
            {
                props.options?.map((option, index) => {
                    return (
                        <button
                            key={index}
                            className={`flex flex-row items-center justify-between 
                                        w-full p-2 my-2 border-2 border-gray-300 
                                        rounded-md cursor-pointer ${
                                            selected === index ? 
                                            index === props.answer ?
                                            "border-green-500 bg-green-200" :
                                            "border-red-500 bg-red-200" :
                                            "border-gray-300"
                                        }

                                        ${selected !== undefined 
                                            && index === props.answer ?
                                            "border-green-500 bg-green-200" :
                                            ""
                                        }
                                        `}
                            onClick={() => handleAnswer(index)}
                            disabled={selected !== undefined}
                            >
                            <span className="text-lg font-semibold">
                                {option}
                            </span>
                        </button>
                    );
                })
            }
            </div>
    )
}

export default Options;