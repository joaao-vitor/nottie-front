import { User } from '@/contexts/AuthProvider';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { cva, VariantProps } from 'class-variance-authority';

const avatarSizes = cva('rounded-full', {
    variants: {
        size: {
            default: 'h-8 w-8',
            lg: 'h-12 w-12',
            md: 'h-10 w-10',
            sm: 'h-6 w-6',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});
interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    user: User;
}
export const UserAvatar = ({ user, size }: UserAvatarProps) => {
    return (
        <Avatar>
            <AvatarImage
                src={user.profileImg}
                className={cn('object-cover', avatarSizes({ size }))}
            />
            <AvatarFallback
                className={cn('bg-neutral-800 p-2.5', avatarSizes({ size }))}
            >
                {user.firstName[0].toUpperCase()}
                {user.lastName[0].toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
};
