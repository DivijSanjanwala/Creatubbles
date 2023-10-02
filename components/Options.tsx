interface OptionProps {
    options: string[] | undefined;
    answer: number | undefined;
    selected: number | undefined;
    setSelected: (index: number|undefined) => void;
}

const Options: React.FC<OptionProps> = (props) => {

    const {selected, setSelected} = props;

    // handles the selected option, emits the selected option to parent
    const handleSelected = (index: number) => {
        setSelected(index);
    }


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
                            onClick={() => handleSelected(index)}
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