import { RenderFieldExtensionCtx } from "datocms-plugin-sdk";
import { FC, MouseEventHandler } from "react";
import { IconFactory } from "../icons";
import { Button } from "datocms-react-ui";

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
      >
        Change
      </Button>

      <Button
        onClick={() => {
          ctx?.setFieldValue(ctx.fieldPath, null);
          setSelectedIcon(null);
        }}
        buttonSize="s"
      >
        Remove
      </Button>
    </div>
  );
};

export default SelectedIconPreview;
