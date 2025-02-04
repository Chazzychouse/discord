"use client";
import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useState } from "react";

const roleIconMap = {
  ADMIN: <ShieldAlert className="h-4 w-4 ml-1 text-rose-500 " />,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-1 text-indigo-500" />,
  GUEST: null,
};

export const MembersModal = () => {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState("");

  const isModalOpen = isOpen && type === "manageMembers";
  const { server } = data as { server: ServerWithMembersWithProfiles };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[400px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-2">
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-zinc-500">{member.profile.email}</p>
              </div>
              {server.profileId !== member.profileId &&
                loadingId !== member.id && <div>Actions</div>}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
