import React from "react";
import Avatar from "../common/Avatar";

const mockContacts = [
  {
    id: 1,
    name: "Charlie",
    about: "Available",
    profilePic: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 2,
    name: "Diana",
    about: "At work",
    profilePic: "https://i.pravatar.cc/150?img=4",
  },
];

const ContactList = ({ searchQuery }) => {
  const filtered = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto">
      {filtered.length > 0 ? (
        filtered.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center gap-3 p-3 hover:bg-wa-light-100 dark:hover:bg-wa-dark-tertiary cursor-pointer border-b border-wa-light-200 dark:border-wa-dark-tertiary"
          >
            <Avatar src={contact.profilePic} alt={contact.name} size="md" />
            <div>
              <h4 className="font-medium text-wa-light-900 dark:text-wa-light-50">
                {contact.name}
              </h4>
              <p className="text-sm text-wa-light-600 dark:text-wa-light-400">
                {contact.about}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-wa-light-500 dark:text-wa-light-400 py-6">
          No contacts found
        </p>
      )}
    </div>
  );
};

export default ContactList;
