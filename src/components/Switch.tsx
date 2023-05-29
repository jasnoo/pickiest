import SwitchSelector from "react-switch-selector";

export default function Switch(){
    const options = [
   {
       label: <span>Person</span>,
       value: {
            person: true
       },
       selectedBackgroundColor: "#0097e6",
   },
   {
       label: "Groups",
       value: "groups",
       selectedBackgroundColor: "#fbc531"
   }
];

const onChange = (newValue) => {
    console.log(newValue);
};

const initialSelectedIndex = options.findIndex(({value}) => value === "groups");

return (
    <div className="your-required-wrapper" >
        <SwitchSelector
            onChange={onChange}
            options={options}
            initialSelectedIndex={initialSelectedIndex}
            backgroundColor={"#353b48"}
            fontColor={"#f5f6fa"}
        />
    </div>
);

}