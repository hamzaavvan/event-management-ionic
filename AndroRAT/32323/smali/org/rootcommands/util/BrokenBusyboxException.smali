.class public Lorg/rootcommands/util/BrokenBusyboxException;
.super Ljava/io/IOException;
.source "BrokenBusyboxException.java"


# static fields
.field private static final serialVersionUID:J = 0x73b43f1c72ee5b19L


# direct methods
.method public constructor <init>()V
    .locals 0

    .prologue
    .line 25
    invoke-direct {p0}, Ljava/io/IOException;-><init>()V

    .line 26
    return-void
.end method

.method public constructor <init>(Ljava/lang/String;)V
    .locals 0
    .parameter "detailMessage"

    .prologue
    .line 29
    invoke-direct {p0, p1}, Ljava/io/IOException;-><init>(Ljava/lang/String;)V

    .line 30
    return-void
.end method
