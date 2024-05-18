import {
  connect,
  IntentCtx,
  RenderConfigScreenCtx,
  RenderFieldExtensionCtx,
} from "datocms-plugin-sdk";
import { render } from "./utils/render";
import "datocms-react-ui/styles.css";
import ConfigScreen from "./entrypoints/ConfigScreen";
import FieldExtension from "./entrypoints/FieldExtension";
// https://react-icons.github.io/react-icons/icons/fi/

const id = "feathericons"
connect({
  renderConfigScreen(ctx: RenderConfigScreenCtx) {
    return render(<ConfigScreen ctx={ctx} />)
  },
  manualFieldExtensions(ctx: IntentCtx) {
    return [
      {
        id,
        name: "Feather Icons",
        type: "editor",
        fieldTypes: ["string"],
      },
    ];
  },
  renderFieldExtension(fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
    switch (fieldExtensionId) {
      case id:
        return render(<FieldExtension ctx={ctx} />);
      default:
        return null;
    }
  }
});