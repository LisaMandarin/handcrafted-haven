'use client'

import LoginButton from "@/components/LoginButton";
import { Divider } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ArtisanDetailType } from "@/types/data";
import { SetState } from "@/types/data";
import { UserType } from "@/types/data";


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

async function fetchPageData(id: string, setUserProfile: SetState<UserType|null>, setArtisan: SetState<ArtisanDetailType|null>, setEditableArtisan: SetState<ArtisanDetailType|null>) {
  const userData = await fetchUserProfile(id);
  const artisanData = await fetchArtisan(id);
  setUserProfile(userData);
  setArtisan(artisanData);
  setEditableArtisan(artisanData);
}

async function updateArtisan(id: string, data: ArtisanDetailType) {
  try {
    if (!id) {
      console.error("Invalid ID");
      return null;
    }
    if (!data) {
      console.error("Invalid Data");
      return null;
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/artisans/id/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    if (response.ok) {
      const {success}= await response.json();
      return success;
    }
  } catch (error) {
    console.error("Error during fetching artisan: ", error);
    return null;
  }
}

export default function ProfilePage() {
  const {data: session, status} = useSession();
  const [userProfile, setUserProfile] = useState<UserType|null>(null);
  const [artisan, setArtisan] = useState<ArtisanDetailType|null>(null);
  const [editableArtisan, setEditableArtisan] = useState<ArtisanDetailType|null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (field: string, value: string) => {
    setEditableArtisan(prev => prev ? { ...prev, [field]: value } : prev);
  }

  const handleCancel = () => {
    setEditMode(false)
    setEditableArtisan(artisan)
  }

  const handleUpdate = async() => {
    if (editableArtisan) {
      const success = await updateArtisan(editableArtisan.id, editableArtisan)
      if (success) {
        setArtisan(editableArtisan);
        setEditableArtisan(editableArtisan);
      }
    }
    setEditMode(false)
  }
  useEffect(() => {
   if (session?.user?.id) {
    const id = session.user.id;
    fetchPageData(id, setUserProfile, setArtisan, setEditableArtisan);
   } 
  }, [session])

  return (
    <>
      {!session && (
        <p>Please <LoginButton /></p>
      )}
      {session && (
        <div className="w-full">
          <h1 className="font-bold text-xl">Profile Management</h1>
          <Divider orientation="center">Basic Information</Divider>
          {!userProfile && (
            <p>Unable to get the user profile. Please contact IT support.</p>
          )}
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
                  <p className="w-1/3 text-right">First Name: </p>
                  {editMode ? <input value={editableArtisan?.first_name} onChange={(e) => handleChange('first_name', e.target.value )} className="w-1/2 rounded-sm px-2"/> : <p className="w-1/2">{artisan.first_name}</p>}
                </div>
                <div className="flex flex-row gap-4 w-full">
                  <p className="w-1/3 text-right">Last Name: </p>
                  {editMode ? <input value={editableArtisan?.last_name} onChange={(e) => handleChange('last_name', e.target.value)} className="w-1/2 rounded-sm px-2"/> : <p className="w-1/2">{artisan.last_name}</p>}
                </div>
                <div className="flex flex-row gap-4 w-full">
                    <p className="w-1/3 text-right">Address</p>
                    {editMode ? <input value={editableArtisan?.address} onChange={(e) => handleChange('address', e.target.value)} className="w-1/2 rounded-sm px-2"/> : <p className="w-1/2">{artisan.address}</p>}
                </div>
                <div className="flex flex-row gap-4 w-full">
                    <p className="w-1/3 text-right">introduction</p>
                    {editMode ? <textarea value={editableArtisan?.introduction} onChange={(e) => handleChange('introduction', e.target.value)} className="w-1/2 rounded-sm px-2" rows={5}/> : <p className="w-1/2">{artisan.introduction}</p>}
                </div>
                <div className="flex flex-row gap-4 w-full">
                    <p className="w-1/3 text-right">Shop Open Date</p>
                    <p className="w-2/3">{dayjs(artisan.created_at).format('YYYY-MM-DD')}</p>
                </div>
              </div>
            </>
          )}
          <div className="flex justify-center">
            {!editMode && (
              <div className="flex flex-row p-4">
                <button className="px-3 py-1 lg:px-6 h-fit bg-custom-dark-brown text-custom-yellow-1 md:rounded-3xl lg:rounded-full" onClick={() => setEditMode(true)}>Edit</button>
              </div>
            )}
            {editMode && (
              <div className="flex flex-row gap-2 p-4">
                <button className="px-3 py-1 lg:px-6 h-fit bg-custom-dark-brown text-custom-yellow-1 md:rounded-3xl lg:rounded-full" onClick={() => handleUpdate()}>Update</button>
                <button className="px-3 py-1 lg:px-6 h-fit bg-custom-yellow-1 text-custom-dark-brown border border-custom-dark-brown md:rounded-3xl lg:rounded-full" onClick={() => handleCancel()}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
