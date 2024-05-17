import {
  connect,
  IntentCtx,
  RenderConfigScreenCtx,
  RenderFieldExtensionCtx,
} from "datocms-plugin-sdk";
import { render } from "./utils/render";
import "datocms-react-ui/styles.css";
import FeatherIconsPicker from "./components/FeatherIconsPicker";
import ConfigScreen from "./entrypoints/ConfigScreen";
// https://react-icons.github.io/react-icons/icons/fi/
// https://github.com/tomphill/datocms-plugin-fontawesome/blob/main/src/components/FontAwesomePicker.tsx

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
        fieldTypes: ["json"],
      },
    ];
  },
  renderFieldExtension(fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
    switch (fieldExtensionId) {
      case id:
        return render(<FeatherIconsPicker ctx={ctx} />);
      default:
        return null;
    }
  }
});