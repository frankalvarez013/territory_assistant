export default async function DeleteCongregation(id) {
  console.log("Invoking Func");
  let res1 = await fetch(`/api/congregation?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await res1.json();
  return res;
}
