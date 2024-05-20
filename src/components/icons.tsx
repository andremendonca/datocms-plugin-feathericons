import * as ReactIcons from "react-icons/fi";


export type Icon = {
  name: string
}

export type Icons = typeof ReactIcons;
const icons: Icons = ReactIcons;

export const IconFactory = ({ name }: { name: string }) => {
  const Comp = icons[name as keyof Icons];
  return <Comp />
}


export default icons;