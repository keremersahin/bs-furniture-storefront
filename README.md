# BS Furniture E-Ticaret Iskeleti

## Teknoloji Secimi

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL

## Klasor Yapisi

```text
app/
  (store)/
    page.tsx
    products/[slug]/page.tsx
  admin/
    login/page.tsx
    orders/page.tsx
    products/page.tsx
  api/contact/route.ts
  checkout/page.tsx
  contact/page.tsx
  legal/
    about/page.tsx
    delivery/page.tsx
    distance-sales/page.tsx
    privacy-security/page.tsx
    returns/page.tsx
  products/page.tsx
components/
  home/
  layout/
  product/
  ui/
lib/
  storefront-products.ts
  utils.ts
prisma/
  schema.prisma
types/
  index.ts
```

## Notlar

- Vitrin tarafindaki urun, kategori ve siparis verileri Prisma/PostgreSQL uzerinden okunur.
- `public/catalogs` klasorune gercek PDF katalog dosyalari eklenmelidir.
- Admin panelindeki urun CRUD akisi `app/admin/products` altinda calisir.
- Urun gorselleri `public/uploads/images`, PDF kataloglar `public/uploads/catalogs` klasorune kaydedilir.
- Kayit islemleri icin `DATABASE_URL` tanimlanmali ve ardindan `prisma migrate dev` ile tablo yapisi olusturulmalidir.
- Admin auth katmani Auth.js (`next-auth`) credentials provider ile kurulmustur.
- `app/admin` rotalari oturum ile korunur; giris icin `ADMIN_EMAIL` ve tercihen `ADMIN_PASSWORD_HASH` kullanilmalidir.
- Checkout ekranindaki temel server action siparisi `Order` ve `OrderItem` tablolarina `PENDING` durumunda kaydeder.
- PayTR iFrame token istegi server-side olarak `app/checkout/actions.ts` icinden yapilir.
- PayTR callback endpointi `app/api/payment/callback/route.ts` altindadir ve hash dogrulamasi yapar.
- Canli entegrasyon icin `APP_URL`, `PAYTR_MERCHANT_ID`, `PAYTR_MERCHANT_KEY` ve `PAYTR_MERCHANT_SALT` alanlari zorunludur.
- Gercek sepet state'i Zustand persist ile tarayici `localStorage` uzerinde tutulur.
- Callback basarili oldugunda siparis `PAID` olur, stoklar transaction ile dusurulur ve SMTP uzerinden siparis onay e-postasi gonderilir.
