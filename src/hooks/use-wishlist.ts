'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';

const WISHLIST_KEY = 'hostelhop-wishlist';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem(WISHLIST_KEY);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error('Failed to parse wishlist from localStorage', error);
      setWishlist([]);
    }
  }, []);

  const updateLocalStorage = (updatedWishlist: number[]) => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  const addToWishlist = useCallback((hostelId: number) => {
    const updatedWishlist = [...wishlist, hostelId];
    updateLocalStorage(updatedWishlist);
    toast({
      title: 'Added to Wishlist!',
      description: 'You can view your wishlist from the navigation menu.',
    });
  }, [wishlist, toast]);

  const removeFromWishlist = useCallback((hostelId: number) => {
    const updatedWishlist = wishlist.filter((id) => id !== hostelId);
    updateLocalStorage(updatedWishlist);
     toast({
      title: 'Removed from Wishlist.',
    });
  }, [wishlist, toast]);

  const isWishlisted = useCallback((hostelId: number) => {
    return wishlist.includes(hostelId);
  }, [wishlist]);

  const toggleWishlist = useCallback((hostelId: number) => {
    if (isWishlisted(hostelId)) {
      removeFromWishlist(hostelId);
    } else {
      addToWishlist(hostelId);
    }
  }, [isWishlisted, addToWishlist, removeFromWishlist]);

  return { wishlist, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist };
};
