import { ColorGroup } from "../../type/ColorGroup";

interface Props {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

function ColorPicker({ selectedColor, onColorChange }: Props) {
  const colors = Object.keys(ColorGroup) as (keyof typeof ColorGroup)[];
  return (
    <>
      {colors.map((color) => (
        <div className="flex gap-2 items-center" key={color}>
          <input
            id={color}
            type="radio"
            name="color"
            checked={selectedColor === color}
            onChange={() => onColorChange(color)}
          />
          <label
            htmlFor={color}
            className={`w-6 h-6 rounded ${ColorGroup[color]}`}
            title={color}
          ></label>
        </div>
      ))}
    </>
  );
}

export default ColorPicker;
