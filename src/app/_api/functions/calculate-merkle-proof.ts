"use server"

import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import merkleTree from "@/shared/utils/merkleTree.json";
import merkleTreeMultiplier from "@/shared/utils/merkleTreeMultiplier.json";
import { unstable_cache } from "next/cache";

const tree = unstable_cache(async () => {
  return StandardMerkleTree.load(merkleTree as any)
});

export const getTreeProof = async (
  index: number,
) => {
  if (!index || index < 0) return null;

  const localTree = await tree();
  return localTree.getProof(index);
};

const treeMultiplier = unstable_cache(async () => {
  return StandardMerkleTree.load(merkleTreeMultiplier as any)
});

export const getTreeMultiplierProof = async (
  index: number,
) => {
  if (!index || index < 0) return null;

  const localTree = await treeMultiplier();
  return localTree.getProof(index);
};
