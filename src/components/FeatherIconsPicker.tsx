import { RenderFieldExtensionCtx } from "datocms-plugin-sdk";
import { FC, useState } from "react";
import get from "lodash/get";

import * as ReactIcons from "react-icons/fi";

import "./styles.css";
import { Canvas, TextInput } from "datocms-react-ui";

type Props = {
  ctx: RenderFieldExtensionCtx;
};

type Icon = {
  name: string
}

type Icons = typeof ReactIcons;
const icons: Icons = ReactIcons;

const IconFactory = ({ name }: { name: string }) => {
  const Comp = icons[name as keyof Icons];
  return <Comp />
}

const FeatherIconsPicker: FC<Props> = ({ ctx }) => {
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

  const allIcons = Object.values(icons)
    .filter((icon: Icon) => {
      if (searchTerm) {
        return icon.name.indexOf(searchTerm.toLowerCase()) !== -1;
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
  const totalPages = Math.ceil(allIcons.length / pageSize);

  return (
    <Canvas ctx={ctx}>
      <div className="App">
        {!selectedIcon && (
          <>
            <div>
              <span className="toggler" onClick={() => setShowIcons((s) => !s)}>
                {showIcons ? "Hide" : "Show"} all icons
              </span>
            </div>
            {!!showIcons && (
              <div className="search-input-wrapper">
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
          </>
        )}
        {!!selectedIcon && (
          <div
            className="selected-icon"
            key={`selected-icon-${selectedIcon}`}
          >
            <div>
              <IconFactory name={selectedIcon} />
            </div>
            <span>{selectedIcon}</span>
            <div
              onClick={() => {
                ctx?.setFieldValue(ctx.fieldPath, null);
                setSelectedIcon(null);
              }}
              className="remove-text"
            >
              Remove
            </div>
          </div>
        )}
        <div className="grid">
          {!selectedIcon &&
            !!showIcons &&
            workingIcons.map((icon) => {
              return (
                <div
                  onClick={() => handleIconClick(icon)}
                  className="icon"
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
        {!workingIcons.length && <h3>No icons found.</h3>}
        {!selectedIcon && !!showIcons && !!workingIcons.length && (
          <div className="pagination">
            <div>
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <div className="pages">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="btn"
                  style={{
                    background: ctx?.theme.primaryColor || "black",
                  }}
                >
                  <icons.FiChevronsLeft />
                </button>
                <button
                  onClick={() => setCurrentPage((s) => s - 1)}
                  disabled={currentPage === 1}
                  className="btn"
                  style={{
                    background: ctx?.theme.primaryColor || "black",
                  }}
                >
                  <icons.FiChevronLeft />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((s) => s + 1)}
                  className="btn"
                  style={{
                    background: ctx?.theme.primaryColor || "black",
                  }}
                >
                  <icons.FiChevronRight />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                  className="btn"
                  style={{
                    background: ctx?.theme.primaryColor || "black",
                  }}
                >
                  <icons.FiChevronsRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Canvas>
  );
};

export default FeatherIconsPicker;