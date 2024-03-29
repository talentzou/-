export const authFields = (str) => {
  const operate_auth = {
    export: `${str}` + "_export",
    delete: `${str}` + "_delete_all",
    increase: `${str}` + "_add"
  }
  const table_auth = { edit: `${str}` + "_edit", delete: `${str}` + "_delete" }

  return { operate_auth, table_auth }
}
