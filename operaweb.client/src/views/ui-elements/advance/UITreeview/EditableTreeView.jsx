import React, { useState } from "react";

const TreeNode = ({ node, onAddNode, onRemoveNode }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => setIsExpanded(!isExpanded);

    return (
        <div style={{ marginLeft: "20px" }}>
            <div>
                <button onClick={handleToggle}>{isExpanded ? "-" : "+"}</button>
                {node.label}
                <button onClick={() => onAddNode(node.id)}>Aggiungi</button>
                <button onClick={() => onRemoveNode(node.id)}>Rimuovi</button>
            </div>
            {isExpanded && node.children && (
                <div>
                    {node.children.map((child) => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            onAddNode={onAddNode}
                            onRemoveNode={onRemoveNode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const EditableTreeView = () => {
    const [treeData, setTreeData] = useState([
        {
            id: 1,
            label: "Nodo Principale",
            children: [],
        },
    ]);

    const addNode = (parentId) => {
        setTreeData((prevTree) => {
            const addNodeRecursively = (nodes) =>
                nodes.map((node) => {
                    if (node.id === parentId) {
                        const newNode = {
                            id: Date.now(),
                            label: `Nuovo Nodo ${Date.now()}`,
                            children: [],
                        };
                        return { ...node, children: [...node.children, newNode] };
                    }
                    return { ...node, children: addNodeRecursively(node.children) };
                });
            return addNodeRecursively(prevTree);
        });
    };

    const removeNode = (nodeId) => {
        setTreeData((prevTree) => {
            const removeNodeRecursively = (nodes) =>
                nodes
                    .filter((node) => node.id !== nodeId)
                    .map((node) => ({
                        ...node,
                        children: removeNodeRecursively(node.children),
                    }));
            return removeNodeRecursively(prevTree);
        });
    };

    return (
        <div>
            <h1>Albero Dinamico</h1>
            {treeData.map((node) => (
                <TreeNode
                    key={node.id}
                    node={node}
                    onAddNode={addNode}
                    onRemoveNode={removeNode}
                />
            ))}
        </div>
    );
};

export default EditableTreeView;