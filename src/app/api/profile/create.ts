import { supabase } from '@/db';
import { generateRandomSequence, searchSocialUser } from '@/services';
import { getBalance } from '@/services/boss-tokens';
import { getBuilderScore } from '@/services/talent-protocol';

export async function createProfile(wallet_address: string) {
    const socialProfiles = await searchSocialUser(wallet_address);
    if (socialProfiles.length === 0) {
        return { error: 'user not found', data: null };
    }
    // get builder score and  boss tokens
    const [builder_score, boss_tokens] = await Promise.all([
        getBuilderScore(wallet_address),
        getBalance(wallet_address)
    ]);
    // calculate boss_budget
    // we ignore the boss points and nomination streak at this point, given both are zero!
    const boss_budget = builder_score * 20 + boss_tokens * 0.01;
    const { error: error_write, data } = await supabase.rpc('insert_user', {
        wallet_address,
        referral_code: generateRandomSequence(16),
        boss_score: 0,
        boss_budget,
        builder_score,
        social_profiles: socialProfiles
    });

    if (error_write) {
        return { error: error_write, data: null };
    }

    return { error: null, data: data };
}
