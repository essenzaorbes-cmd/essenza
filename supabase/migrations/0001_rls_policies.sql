-- RLS Policies para ESSENZA

-- Activar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 1. profiles
-- Usuarios leen y editan su propio perfil
CREATE POLICY "Usuarios leen su propio perfil" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuarios editan su propio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admins ven todo (requiere verificar el rol en el JWT, o una tabla admin)
-- Simplificacion usando auth.uid() por ahora. Para produccion se usaria custom claims.
CREATE POLICY "Admins leen todos los perfiles" ON profiles
  FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'super_admin')
  );

-- 2. brands y products
-- Publico lee marcas activas
CREATE POLICY "Publico lee marcas activas" ON brands
  FOR SELECT USING (is_active = true);

-- Publico lee productos activos
CREATE POLICY "Publico lee productos activos" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Publico lee variantes" ON product_variants
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM products WHERE id = product_variants.product_id AND is_active = true)
  );

-- Admins gestionan catalogo
CREATE POLICY "Admins gestionan brands" ON brands
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'super_admin'));

CREATE POLICY "Admins gestionan products" ON products
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'super_admin'));

CREATE POLICY "Admins gestionan variantes" ON product_variants
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'super_admin'));

-- 3. orders y order_items
-- Usuarios leen sus ordenes
CREATE POLICY "Usuarios leen sus propias ordenes" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuarios leen items de sus ordenes" ON order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE id = order_items.order_id AND user_id = auth.uid())
  );

-- Usuarios insertan ordenes (checkout session completion from server bypasses RLS, but if needed from client):
CREATE POLICY "Usuarios crean ordenes" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios crean items de orden" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE id = order_items.order_id AND user_id = auth.uid())
  );

-- Admins leen todas las ordenes
CREATE POLICY "Admins leen todas las ordenes" ON orders
  FOR SELECT USING ((SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'super_admin'));

CREATE POLICY "Admins leen todos los items" ON order_items
  FOR SELECT USING ((SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'super_admin'));

-- 4. wishlists
CREATE POLICY "Usuarios leen su wishlist" ON wishlists
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios insertan en wishlist" ON wishlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios borran de wishlist" ON wishlists
  FOR DELETE USING (auth.uid() = user_id);

-- 5. reviews
CREATE POLICY "Publico lee reviews" ON reviews
  FOR SELECT USING (true);
CREATE POLICY "Usuarios crean reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios editan sus reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuarios borran sus reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);
