import { RenderFieldExtensionCtx } from "datocms-plugin-sdk";
import { FC, MouseEventHandler } from "react";
import { IconFactory } from "../icons";
import { Button } from "datocms-react-ui";
import { FaPen, FaTrash } from "react-icons/fa";

import styles from "./styles.module.css";

type Props = {
  ctx: RenderFieldExtensionCtx;
  selectedIcon: string;
  setSelectedIcon: Function;
  handleOpenModal: MouseEventHandler;
};

const SelectedIconPreview: FC<Props> = ({
  ctx,
  selectedIcon,
  setSelectedIcon,
  handleOpenModal,
}) => {
  return (
    <div className={styles.main} key={`selected-icon-${selectedIcon}`}>
      <div>
        <div className={styles.selectedIcon}><IconFactory name={selectedIcon} /></div>
        <span>{selectedIcon}</span>
      </div>

      <Button
        type="button"
        onClick={handleOpenModal}
        buttonSize="s"
        leftIcon={<FaPen className={styles.buttonIcon} />}
      >
        Change
      </Button>

      <Button
        onClick={() => {
          ctx?.setFieldValue(ctx.fieldPath, null);
          setSelectedIcon(null);
        }}
        buttonSize="s"
        leftIcon={<FaTrash className={styles.buttonIcon} />}
      >
        Remove
      </Button>
    </div>
  );
};

export default SelectedIconPreview;
