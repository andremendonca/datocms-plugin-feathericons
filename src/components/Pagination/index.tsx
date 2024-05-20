import { RenderFieldExtensionCtx } from "datocms-plugin-sdk";
import { FC } from "react";

import styles from "./styles.module.css";
import icons, { Icon } from "../icons";

type Props = {
  ctx: RenderFieldExtensionCtx;
  allIcons: Array<Icon>;
  currentPage: number;
  pageSize: number;
  setCurrentPage: Function;
};

const Pagination: FC<Props> = ({
  ctx,
  allIcons,
  currentPage,
  setCurrentPage,
  pageSize,
}) => {
  const totalPages = Math.ceil(allIcons.length / pageSize);

  return (
    <>
      <div className={styles.pagination}>
        <div>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div className={styles.pages}>
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={styles.btn}
              style={{
                background: ctx?.theme.primaryColor || "black",
              }}
            >
              <icons.FiChevronsLeft />
            </button>
            <button
              onClick={() => setCurrentPage((state: number) => state - 1)}
              disabled={currentPage === 1}
              className={styles.btn}
              style={{
                background: ctx?.theme.primaryColor || "black",
              }}
            >
              <icons.FiChevronLeft />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((state: number) => state + 1)}
              className={styles.btn}
              style={{
                background: ctx?.theme.primaryColor || "black",
              }}
            >
              <icons.FiChevronRight />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className={styles.btn}
              style={{
                background: ctx?.theme.primaryColor || "black",
              }}
            >
              <icons.FiChevronsRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
