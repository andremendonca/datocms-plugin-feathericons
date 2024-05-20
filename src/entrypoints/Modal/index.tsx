import { useState } from "react";
import { RenderModalCtx } from "datocms-plugin-sdk";
import { Canvas, TextInput, Toolbar } from "datocms-react-ui";
import icons, { Icon, IconFactory } from "../../components/icons";

import styles from "./styles.module.css";

type Props = {
  ctx: RenderModalCtx;
};

export default function Modal({ ctx }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleIconClick = (icon: Icon) => ctx.resolve(icon);

  const filteredIcons = Object.keys(icons)
    .map((name) => ({ name }))
    .filter((icon: Icon) => {
      if (searchTerm) {
        return icon.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      } else {
        return icon;
      }
    })
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      }
      return 0;
    });

  return (
    <Canvas ctx={ctx}>
      <Toolbar>
        <div className={styles.search}>
          <TextInput
            value={searchTerm}
            onChange={(newValue) => setSearchTerm(newValue)}
            placeholder="Search..."
            type="search"
          />
        </div>
      </Toolbar>
      <div className={styles.icons}>
        <div className={styles.grid}>
          {filteredIcons.map((icon) => {
            return (
              <div
                onClick={() => handleIconClick(icon)}
                className={styles.icon}
                key={`icon-${icon.name}`}
              >
                <div>
                  <IconFactory name={icon.name} />
                </div>
                <span>{icon.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      {filteredIcons.length === 0 && <h3>No icons found.</h3>}
    </Canvas>
  );
}
