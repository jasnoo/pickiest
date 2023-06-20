import { useState } from "react";
import Instructions from "./Instructions"


function Header() {
    const [showInstructions, setShowInstructions] = useState<boolean>(false)

    function toggleInstructions() {
        setShowInstructions(!showInstructions)
    }

    return (
        <>
            <h1>Pickiest</h1>
            <h3>The easiest way to pick randomly</h3>
            {/* <div className='howTo'><span onClick={toggleInstructions}>How to use</span>
                <Instructions showInstructions={showInstructions} />
            </div> */}
        </>
    )

}
export default Header