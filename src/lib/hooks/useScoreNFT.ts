"use client";

import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { BASE_NINJA_SCORE_ABI, BASE_NINJA_SCORE_ADDRESS } from '~/lib/contract';
import { base } from 'wagmi/chains';

export function useMintScoreNFT() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const mintScore = async (score: number, combo: number, level: number) => {
    try {
      writeContract({
        address: BASE_NINJA_SCORE_ADDRESS as `0x${string}`,
        abi: BASE_NINJA_SCORE_ABI,
        functionName: 'mintScore',
        args: [BigInt(score), BigInt(combo), BigInt(level)],
        chainId: base.id,
      });
    } catch (err) {
      console.error('Error minting score NFT:', err);
      throw err;
    }
  };

  return {
    mintScore,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}

export function usePlayerScores(address?: string) {
  const { data: tokenIds } = useReadContract({
    address: BASE_NINJA_SCORE_ADDRESS as `0x${string}`,
    abi: BASE_NINJA_SCORE_ABI,
    functionName: 'getPlayerTokens',
    args: address ? [address as `0x${string}`] : undefined,
    chainId: base.id,
  });

  const { data: highestScore } = useReadContract({
    address: BASE_NINJA_SCORE_ADDRESS as `0x${string}`,
    abi: BASE_NINJA_SCORE_ABI,
    functionName: 'getHighestScore',
    args: address ? [address as `0x${string}`] : undefined,
    chainId: base.id,
  });

  return {
    tokenIds: tokenIds as bigint[] | undefined,
    highestScore: highestScore ? Number(highestScore) : 0,
  };
}
