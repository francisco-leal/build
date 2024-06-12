"use server";

import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import merkleTree from "@/shared/utils/merkleTree.json";
import merkleTreeMultiplier from "@/shared/utils/merkleTreeMultiplier.json";

const tree = StandardMerkleTree.load(merkleTree as any);

export const getTreeProof = async (index: number) => {
  if (!index || index < 0) return null;

  return tree.getProof(index);
};

const treeMultiplier = StandardMerkleTree.load(merkleTreeMultiplier as any);

export const getTreeMultiplierProof = async (index: number) => {
  if (!index || index < 0) return null;

  return treeMultiplier.getProof(index);
};
