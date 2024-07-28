import {useNavigate} from 'react-router-dom';
export default function Subject1() {
    const navigate = useNavigate();

    const navigateToTest = () => {
        navigate("/test", { state: { fromPage: 'Page1' } });
    }

    return (
        <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
            <div className="container mx-auto">
                <div className="mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="
                        relative
                        mx-auto
                        max-w-[525px]
                        overflow-hidden
                        rounded-lg
                        bg-white
                        py-5
                        px-16
                        text-center
                        sm:px-12
                        md:px-[60px]
                        ">
                            <div className="mb-10 text-center md:mb-16">Test</div>
                            <button onClick={navigateToTest}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >Start Test
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
