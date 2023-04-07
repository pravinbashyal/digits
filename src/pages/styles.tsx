import { borderStyle } from "../styles";
import { Styles } from "../types/styles";

export const styles: Styles = {
  mainSection: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  headerSection: {
    minWidth: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    marginLeft: -20,
  },
  header: {
    borderBottom: borderStyle,
    width: "400px",
    fontSize: "3.5rem",
  },
  app: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    overflowY: "scroll",
    minHeight: "100%",
    maxWidth: "1200px",
  },
};
