"use client";

import { useState, useEffect } from "react";
import { Mail, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  submittedAt: string;
}

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contacts");
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });

      if (!res.ok) {
        const error = await res.json();
        alert(`Failed to delete: ${error.error || "Unknown error"}`);
        return;
      }

      fetchContacts();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete message. Please try again.");
    }
  };

  const toggleRead = async (contact: Contact) => {
    try {
      const res = await fetch(`/api/contacts/${contact._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: !contact.read }),
      });

      if (!res.ok) {
        alert("Failed to update status");
        return;
      }

      fetchContacts();
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update. Please try again.");
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    if (filter === "unread") return !contact.read;
    if (filter === "read") return contact.read;
    return true;
  });

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Contact Messages</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            All ({contacts.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filter === "unread"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filter === "read"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            Read ({contacts.length - unreadCount})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="animate-spin" />
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="text-center p-12 bg-muted/30 rounded-lg">
          <Mail size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {filter === "all" ? "No messages yet" : `No ${filter} messages`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <div
              key={contact._id}
              className={`bg-card border rounded-lg p-4 transition-colors ${
                !contact.read ? "border-primary/50 bg-primary/5" : ""
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2">
                    {!contact.read && (
                      <span className="h-2 w-2 bg-primary rounded-full" />
                    )}
                    <h3 className="font-bold truncate">{contact.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {format(
                        new Date(contact.submittedAt),
                        "MMM dd, yyyy 'at' h:mm a"
                      )}
                    </span>
                  </div>

                  {/* Email and Subject */}
                  <div className="text-sm space-y-1 mb-3">
                    <p className="text-muted-foreground">
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-primary hover:underline"
                      >
                        {contact.email}
                      </a>
                    </p>
                    {contact.subject && (
                      <p className="font-medium">Subject: {contact.subject}</p>
                    )}
                  </div>

                  {/* Message Preview/Full */}
                  <div className="text-sm">
                    {expandedId === contact._id ? (
                      <p className="whitespace-pre-wrap bg-muted/30 p-3 rounded">
                        {contact.message}
                      </p>
                    ) : (
                      <p className="text-muted-foreground truncate">
                        {contact.message}
                      </p>
                    )}
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() =>
                      setExpandedId(
                        expandedId === contact._id ? null : contact._id
                      )
                    }
                    className="text-xs text-primary hover:underline mt-2"
                  >
                    {expandedId === contact._id
                      ? "Show less"
                      : "Read full message"}
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleRead(contact)}
                    className="p-2 hover:bg-accent rounded-md"
                    title={contact.read ? "Mark as unread" : "Mark as read"}
                  >
                    {contact.read ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => onDelete(contact._id)}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-md"
                    title="Delete message"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
