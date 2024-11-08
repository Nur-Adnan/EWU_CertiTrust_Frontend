// ProfileSection.tsx
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User } from "lucide-react";
import { magic } from "../utils/Magic";
import api from "@/api"; // Import Axios instance for API requests

interface UserProfile {
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  bio: string;
  photoUrl: string;
  department?: string; // Add department as an optional field
}

const initialProfile: UserProfile = {
  name: "",
  email: "",
  role: "",
  phone: "",
  address: "",
  bio: "",
  photoUrl: "/placeholder.svg?height=100&width=100",
  department: "", // Initialize department field
};

export default function ProfileSection() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>(initialProfile);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await api.put("/users/profile/update", {
        email: user?.email,
        name: tempProfile.name,
        phone: tempProfile.phone,
        address: tempProfile.address,
        bio: tempProfile.bio,
        photoUrl: tempProfile.photoUrl || profile.photoUrl,
        department: tempProfile.department || profile.department, // Include department in update
      });
      if (response.status === 200) {
        setProfile(tempProfile);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "out61o2m");

      try {
        const response = await api.post(
          "https://api.cloudinary.com/v1_1/dw0fbmqur/image/upload",
          formData
        );
        setTempProfile((prev) => ({
          ...prev,
          photoUrl: response.data.secure_url,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const userInfo = await magic.user.getInfo();
      setUser(userInfo);

      // Fetch profile data based on email
      const profileResponse = await api.get(`/users/profile`, {
        params: {
          email: userInfo.email
        }
      });

      setProfile(profileResponse.data);
      setTempProfile(profileResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };



  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage
                src={isEditing ? tempProfile.photoUrl : profile.photoUrl}
                alt="Profile photo"
              />
              <AvatarFallback>
                <User className="w-16 h-16" />
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <div className="relative">
                <input
                  type="file"
                  id="photo-upload"
                  className="sr-only"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                <Label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex items-center justify-center space-x-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Camera className="w-4 h-4" />
                  <span>Change Photo (Optional)</span>
                </Label>
              </div>
            )}
          </div>
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={isEditing ? tempProfile.name : profile.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user?.email}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" name="role" value={profile.role} readOnly />
              </div>
              {profile.role === "faculty" && ( // Only show department field for faculty
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    value={
                      isEditing ? tempProfile.department : profile.department
                    }
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={isEditing ? tempProfile.phone : profile.phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={isEditing ? tempProfile.address : profile.address}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={isEditing ? tempProfile.bio : profile.bio}
                onChange={handleInputChange}
                readOnly={!isEditing}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="did">DID</Label>
              <Input id="did" name="DID" value={user?.issuer} readOnly />
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          {isEditing ? (
            <>
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
