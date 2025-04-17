'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function CallbackPage() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const handleCallback = async () => {
      if (!user) return;

      const twitterAccount = user.externalAccounts.find(
        (account) => account.provider === 'oauth_x' as unknown as string
      );

      if (!twitterAccount) {
        console.error('Twitter account not linked');
        return;
      }

      router.push('/mentions'); // Redirect to mentions page
    };

    handleCallback();
  }, [user, router]);

  return <div>Authenticating...</div>;
}