import SectionService from "@/api/section";
import {
  useSectionData,
  type SectionContextType,
} from "@/context/SectionContext";
import { X, Trash2, Pencil, Check, XCircle } from "lucide-react";
import { useState } from "react";

function Comments({ onClose }: { onClose: () => void }) {
  const { section, comments, setComments } =
    useSectionData() as SectionContextType;

  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  if (!section) return null;

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const res = await SectionService.addComment(section!.id, newComment);
    setComments((prev) => [...prev, res.comment]);
    setNewComment("");
  };

  const startEdit = (id: string, current: string) => {
    setEditingId(id);
    setEditingValue(current);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingValue("");
  };

  const saveEdit = async (id: string) => {
    if (!editingValue.trim()) return;
    const res = await SectionService.updateComment(
      section.id,
      id,
      editingValue
    );
    setComments((prev) => prev.map((c) => (c.id === id ? res.comment : c)));
    setEditingId(null);
    setEditingValue("");
  };

  const deleteComment = async (id: string) => {
    await SectionService.deleteComment(section.id, id);
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="comments-overlay">
      <div className="comments-panel">
        <div className="comments-header">
          <div className="flex flex-col">
            <h2 className="comments-title">Comments</h2>
            <p className="text-slate-400 text-sm">{section.title}</p>
          </div>
          <button className="icon-btn" onClick={onClose} title="Close comments">
            <X />
          </button>
        </div>

        <div className="comments-list">
          {comments && comments.length > 0 ? (
            comments.map((c) => {
              const isEditing = editingId === c.id;
              return (
                <div key={c.id} className="comment-item">
                  <div className="comment-row">
                    {isEditing ? (
                      <textarea
                        className="comment-edit-input"
                        rows={2}
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                      />
                    ) : (
                      <p className="comment-content">{c.content}</p>
                    )}

                    <div className="comment-actions">
                      {isEditing ? (
                        <>
                          <button
                            className="icon-btn"
                            title="Save"
                            onClick={() => saveEdit(c.id)}
                          >
                            <Check size={16} />
                          </button>
                          <button
                            className="icon-btn"
                            title="Cancel"
                            onClick={cancelEdit}
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="icon-btn"
                            title="Edit comment"
                            onClick={() => startEdit(c.id, c.content)}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="icon-btn"
                            title="Delete comment"
                            onClick={() => deleteComment(c.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="comments-empty">No comments yet.</p>
          )}
        </div>

        <div className="comments-input">
          <textarea
            rows={3}
            className="comments-textarea"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="comments-submit-btn" onClick={handleAddComment}>
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comments;
