import Image from 'next/image'

export function ItemIcon({ item, size = 24 }: { item: string, size?: number }) {
  return <Image src={`/textures/${item}.png`} className="item-icon" width={size} height={size} alt={item} />;
}