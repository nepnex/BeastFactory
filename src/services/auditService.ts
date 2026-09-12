import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AuditLogEntry {
  action: string;
  entityTable: string;
  recordId?: string;
  details?: Record<string, any>;
}

export const auditService = {
  async logAction(entry: AuditLogEntry): Promise<void> {
    try {
      if (isSupabaseConfigured && supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        await supabase.from('admin_audit_logs').insert({
          admin_user_id: user?.id || null,
          admin_email: user?.email || 'admin@beastfactory.com',
          action: entry.action,
          entity_table: entry.entityTable,
          record_id: entry.recordId || null,
          details: entry.details || {},
        });
      } else {
        console.info('[AuditLog]', new Date().toISOString(), entry);
      }
    } catch (err) {
      console.warn('Audit logging handled gracefully:', err);
    }
  },
};
