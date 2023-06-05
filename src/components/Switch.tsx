import SwitchSelector from "react-switch-selector";

export default function Switch(props) {
  const options = [
    {
      label: <span>Individual</span>,
      value: {
        person: true,
      },
      selectedBackgroundColor: "#0097e6",
    },
    {
      label: "Groups",
      value: "groups",
      selectedBackgroundColor: "#fbc531",
    },
  ];

  const onChange = () => props.handleToggle();

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "person"
  );

  return (
    <div className="switch-wrapper" style={{ width: 300, height: 40 }}>
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
