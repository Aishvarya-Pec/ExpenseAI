"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

type Currency = "USD" | "INR";

interface Group {
  id: string;
  name: string;
  members: string[];
  currency: Currency;
}

const GroupExpensesPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroup, setNewGroup] = useState<Group>({
    id: "",
    name: "",
    members: [],
    currency: "INR",
  });
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const handleCreateGroup = () => {
    const updatedGroups = [...groups, { ...newGroup, id: Date.now().toString() }];
    setGroups(updatedGroups);
    setNewGroup({ id: "", name: "", members: [], currency: "INR" });
    setShowCreateGroup(false);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Groups</h2>
        <button
          onClick={() => setShowCreateGroup(true)}
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400"
        >
          <Plus className="inline-block mr-2" /> Add Group
        </button>
      </div>

      {groups.length === 0 && <p className="text-gray-300">No groups created yet.</p>}

      <ul className="space-y-4">
        {groups.map((group) => (
          <motion.li
            key={group.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-black/40 border border-yellow-500/20 rounded-lg text-white"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{group.name}</h3>
                <p className="text-sm text-gray-400">Currency: {group.currency}</p>
              </div>
              <button
                onClick={() => setGroups(groups.filter((g) => g.id !== group.id))}
                className="text-red-500 hover:text-red-400"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </motion.li>
        ))}
      </ul>

      {showCreateGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#111] p-6 rounded-lg shadow-lg border border-yellow-500/20 text-white w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-4">Create New Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              value={newGroup.name}
              onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
              className="w-full px-4 py-2 mb-4 bg-black/50 border border-yellow-500/20 rounded-lg text-white focus:outline-none"
            />
            <select
              value={newGroup.currency}
              onChange={(e) =>
                setNewGroup((prev) => ({
                  ...prev,
                  currency: e.target.value as Currency,
                }))
              }
              className="w-full px-4 py-2 mb-4 bg-black/50 border border-yellow-500/20 rounded-lg text-white focus:outline-none"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCreateGroup(false)}
                className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupExpensesPage;
