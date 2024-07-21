import { cookies } from "next/headers";

export async function autheticate() {
  const token = await getSession();
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "api/user/profile",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) return false;
    return response.json();
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getSession() {
  const session = cookies().get("token")?.value;
  if (!session) return null;
  return session;
}

export async function logout() {
  cookies().set("token", "", { expires: new Date(0) });
}
