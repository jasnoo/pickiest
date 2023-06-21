type InstructionProps = {
    showInstructions: boolean;
}

function Instructions({ showInstructions }: InstructionProps) {
    if (showInstructions) {
        return (
            <ol>
                <li>Use the toggle to select if you want to choose specific individuals from your items or if you want to create groups of the items</li>
                <li>Select how many items/groups should be picked (for example, choosing 1 item from your list or creating 2 groups from the items</li>
                <li>Input each item using the text field. All items will appear on the page</li>
                <li>Click Pick to see your picked items/groups</li>
                <li>If you want to reset the names, click reset</li>
            </ol>
        )
    }
    else return null
}
export default Instructions