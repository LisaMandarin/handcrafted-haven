import { getSession } from "@/utils/session";
import LoginButton from "@/components/LoginButton";
import { Divider } from "antd";
import dayjs from "dayjs";
import Image from "next/image";

async function fetchUserProfile(id: string) {
  try {
    if (!id) {
      console.error("Invalid ID");
      return null;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`
    );
    if (!response.ok) {
      console.error("Unable to fetch user profile");
      return null;
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error during fetching user: ", error);
    return null;
  }
}

async function fetchArtisan(id: string) {
  try {
    if (!id) {
      console.error("Invalid ID");
      return null;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/artisans/user/${id}`
    );
    if (!response.ok) {
      console.error("Unable to fetch artisan");
      return null;
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error during fetching artisan: ", error);
    return null;
  }
}

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) {
    return (
      <>
        Please <LoginButton />
      </>
    );
  }

  const userProfile = await fetchUserProfile(session?.user?.id);
  const artisan = await fetchArtisan(session?.user?.id);

  if (!userProfile) {
    return <>Unable to get the user profile. Please contact IT support.</>;
  }

  return (
    <>
      {session && (
        <div className="w-full">
          <h1 className="font-bold text-xl">Profile Management</h1>
          <Divider orientation="center">Basic Information</Divider>
          {userProfile && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4 w-full">
                <p className="w-1/3 text-right">Username: </p>
                <p className="w-2/3">{userProfile.username}</p>
              </div>
              <div className="flex flex-row gap-4 w-full">
                <p className="w-1/3 text-right">Email: </p>
                <p className="w-2/3">{userProfile.email}</p>
              </div>
              <div className="flex flex-row gap-4 w-full">
                <p className="w-1/3 text-right">Password</p>
                <p className="w-2/3">******</p>
              </div>
              <div className="flex flex-row gap-4 w-full">
                <p className="w-1/3 text-right">Registration Date: </p>
                <p className="w-2/3">
                  {dayjs(userProfile.created_at).format("YYYY-MM-DD")}
                </p>
              </div>
            </div>
          )}
          {artisan && (
            <>
              <Divider>Artisan Information</Divider>
              <div className="flex flex-col gap-4">
                <div>
                    <Image src={artisan.image_url} alt={`${artisan.first_name} ${artisan.last_name}`} width={300} height={400} className="mx-auto" />
                </div>
                <div className="flex flex-row gap-4 w-full">
                  <p className="w-1/3 text-right">Name: </p>
                  <p className="w-2/3">{artisan.first_name} {artisan.last_name}</p>
                </div>
                <div className="flex flex-row gap-4 w-full">
                    <p className="w-1/3 text-right">Address</p>
                    <p className="w-2/3">{artisan.address}</p>
                </div>
                <div className="flex flex-row gap-4 w-full">
                    <p className="w-1/3 text-right">introduction</p>
                    <p className="w-2/3">{artisan.introduction}</p>
                </div>
                <div className="flex flex-row gap-4 w-full">
                    <p className="w-1/3 text-right">Shop Open Date</p>
                    <p className="w-2/3">{dayjs(artisan.created_at).format('YYYY-MM-DD')}</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
