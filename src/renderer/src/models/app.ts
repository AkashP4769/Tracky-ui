
// id = Column(Integer, primary_key=True, index=True)
// user_id = Column(Integer, ForeignKey("users.id"), index=True)
// name = Column(String, index=True)
// path = Column(String, nullable=True)
// process_name = Column(String, index=True)
// icon = Column(String, nullable=True)  # Storing icon as a base64 string for simplicity
// category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
// added_on = Column(DateTime, default=datetime.utcnow)
// last_used = Column(DateTime, nullable=True)
// tracking_enabled = Column(Boolean, default=True)

export interface App {
    id: number;
    user_id: number;
    name: string;
    path?: string;
    process_name: string;
    icon?: string; // base64 string
    category_id?: number;
    added_on: Date;
    last_used?: Date;
    tracking_enabled: boolean;
} 