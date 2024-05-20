import { RenderFieldExtensionCtx } from "datocms-plugin-sdk";
import { FC, useState } from "react";
import get from "lodash/get";

import styles from "./styles.module.css";
import { Button, Canvas, TextInput } from "datocms-react-ui";
import Pagination from "../../components/Pagination";
import icons, { Icon, IconFactory } from "../../components/icons";
import SelectedIconPreview from "../../components/SelectedIconPreview/SelectedIconPreview";

type Props = {
  ctx: RenderFieldExtensionCtx;
};

const FieldExtension: FC<Props> = ({ ctx }) => {
  const rawValue = get(ctx?.formValues, ctx?.fieldPath || "");
  const [showIcons, setShowIcons] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIcon, setSelectedIcon] = useState(
    typeof rawValue === "string" ? rawValue : null
  );

  const handleUpdate = (icon: Icon) => {
    const name = icon?.name;
    setSelectedIcon(name);
    ctx?.setFieldValue(ctx.fieldPath, name || "");
  };

  const handleIconClick = (icon: Icon) => {
    handleUpdate(icon);
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

  const handleOpenModal = async () => {
    const exitValue = (await ctx.openModal({
      id: "icon-picker",
      parameters: {},
      width: 1200,
      title: "Select an icon",
    })) as Icon | undefined;

    if (!exitValue) return;
    handleUpdate(exitValue);
  };

  if (selectedIcon) {
    return (
      <Canvas ctx={ctx}>
        <div className={styles.main}>
          <SelectedIconPreview
            ctx={ctx}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            handleOpenModal={handleOpenModal}
          />
        </div>
      </Canvas>
    );
  }

  return (
    <Canvas ctx={ctx}>
      <div className={`${styles.main} ${styles.empty}`}>
        <Button type="button" onClick={handleOpenModal}>
          Select Icon
        </Button>
      </div>
    </Canvas>
  );
};

export default FieldExtension;
