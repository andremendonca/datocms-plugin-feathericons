import { RenderFieldExtensionCtx } from "datocms-plugin-sdk";
import { FC } from "react";

import styles from "./styles.module.css";
import { IconFactory } from "../icons";

type Props = {
  ctx: RenderFieldExtensionCtx;
  selectedIcon: string;
  setSelectedIcon: Function;
};

const SelectedIconPreview: FC<Props> = ({ ctx, selectedIcon, setSelectedIcon }) => {
  return (
    <div
      className={styles.selectedIcon}
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
        className={styles.remove}
      >
        Remove
      </div>
    </div>
  );
};

export default SelectedIconPreview;
