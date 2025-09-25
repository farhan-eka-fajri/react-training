import * as Sentry from "@sentry/react";

export default function PageLogging() {
  return (
    <>
      <button
        onClick={() => {
          // Send a log before throwing the error
          Sentry.logger.info("User triggered test error", {
            action: "test_error_button_click",
          });
          throw new Error("Error buat WOB nanti");
        }}
        style={{
          fontSize: "x-large",
          borderRadius: "15px",
          padding: 20,
          cursor: "pointer",
          backgroundColor: "red",
          color: "white",
          fontWeight: 700,
        }}
      >
        BREAK THE WORLD
      </button>
    </>
  );
}
