import { RenderFieldExtensionCtx } from "datocms-plugin-sdk";
import { FC, useState } from "react";
import get from "lodash/get";

import styles from "./styles.module.css";
import { Canvas, TextInput } from "datocms-react-ui";
import Pagination from "../../components/Pagination";
import icons, { Icon, IconFactory } from "../../components/icons";
import SelectedIconPreview from "../../components/SelectedIconPreview/SelectedIconPreview";

type Props = {
  ctx: RenderFieldExtensionCtx;
};

const FieldExtension: FC<Props> = ({ ctx }) => {
  const initialValue = get(ctx?.formValues, ctx?.fieldPath || "");
  const [showIcons, setShowIcons] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIcon, setSelectedIcon] = useState(
    typeof initialValue === "string" ? initialValue : null
  );

  const handleIconClick = (icon: Icon) => {
    const name = icon?.name;
    setSelectedIcon(name);
    ctx?.setFieldValue(ctx.fieldPath, name || "");
  };

  const allIcons = Object.keys(icons)
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
  const pageSize = 30;
  const workingIcons = [...allIcons].slice(
    (currentPage - 1) * pageSize,
    (currentPage - 1) * pageSize + pageSize
  );

  if (selectedIcon) {
    return (
      <Canvas ctx={ctx}>
              <div className={styles.main}>
        <SelectedIconPreview
          ctx={ctx}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        /></div>
      </Canvas>
    );
  }

  return (
    <Canvas ctx={ctx}>
      <div className={styles.main}>
        <div>
          <span
            className={styles.toggler}
            onClick={() => setShowIcons((s) => !s)}
          >
            {showIcons ? "Hide" : "Show"} all icons
          </span>
        </div>
        {showIcons && (
          <div className={styles.search}>
            <TextInput
              value={searchTerm}
              onChange={(newValue) => {
                setCurrentPage(1);
                setSearchTerm(newValue);
              }}
              placeholder="Search..."
              type="search"
            />
          </div>
        )}
        <div className={styles.grid}>
          {showIcons &&
            workingIcons.map((icon) => {
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
        {workingIcons.length === 0 && <h3>No icons found.</h3>}
        {showIcons && workingIcons.length > 0 && (
          <Pagination
            ctx={ctx}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            allIcons={allIcons}
            pageSize={pageSize}
          />
        )}
      </div>
    </Canvas>
  );
};

export default FieldExtension;
