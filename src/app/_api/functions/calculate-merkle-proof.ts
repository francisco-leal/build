"use server";

import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

const fetchJSONFromURL = async (url: string): Promise<any> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.json();
};

let tree: any | null;
let treeMultiplier: any | null;

const loadTree = async () => {
  if (!tree) {
    const merkleTree = await fetchJSONFromURL(
      "https://build-top-images.s3.eu-west-2.amazonaws.com/tree.json",
    );
    tree = StandardMerkleTree.load(merkleTree);
  }
};

const loadTreeMultiplier = async () => {
  if (!treeMultiplier) {
    const merkleTreeMultiplier = await fetchJSONFromURL(
      "https://build-top-images.s3.eu-west-2.amazonaws.com/multiplierTree.json",
    );
    treeMultiplier = StandardMerkleTree.load(merkleTreeMultiplier);
  }
};

export const getTreeProof = async (index: number) => {
  if (index == null || index < 0) return null;
  await loadTree();
  return tree?.getProof(index) || null;
};

export const getTreeMultiplierProof = async (index: number) => {
  if (index == null || index < 0) return null;
  await loadTreeMultiplier();
  return treeMultiplier?.getProof(index) || null;
};
